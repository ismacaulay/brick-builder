import { EventController } from "../EventController";
import { CameraController } from "../CameraController";
jest.mock("../CameraController");

describe("EventController", () => {
  let mockCameraController;

  let cameraController;
  let patient;

  beforeEach(() => {
    CameraController.mockClear();
    mockCameraController = new CameraController();

    cameraController = CameraController.mock.instances[0];
    patient = new EventController(cameraController);
  });

  function setInProgress(inProgress) {
    cameraController.inProgress.mockReturnValue(inProgress);
  }

  describe("keyPressed", () => {
    function verifyResetCameraCallCount(count) {
      expect(cameraController.resetCamera.mock.calls.length).toBe(count);
    }

    test("will reset camera when r key is pressed if not in progress", () => {
      patient.keyPressed("r");

      verifyResetCameraCallCount(1);
    });

    test("will not reset camera when a different key is pressed", () => {
      patient.keyPressed("a");

      verifyResetCameraCallCount(0);
    });
  });

  describe("mouseDown", () => {
    function verifyStartCameraUpdateCalled(button, x, y) {
      expect(cameraController.startCameraUpdate.mock.calls.length).toBe(1);
      expect(cameraController.startCameraUpdate.mock.calls[0][0]).toBe(button);
      expect(cameraController.startCameraUpdate.mock.calls[0][1]).toBe(x);
      expect(cameraController.startCameraUpdate.mock.calls[0][2]).toBe(y);
    }

    function verifyStartCameraUpdateNotCalled() {
      expect(cameraController.startCameraUpdate.mock.calls.length).toBe(0);
    }

    test("will start camera update if not in progress", () => {
      setInProgress(false);

      const expectedButton = "a button";
      const expectedX = 123.4;
      const expectedY = 234.5;

      patient.mouseDown(expectedButton, expectedX, expectedY);

      verifyStartCameraUpdateCalled(expectedButton, expectedX, expectedY);
    });

    test("will not start camera update if in progress", () => {
      setInProgress(true);

      patient.mouseDown("a button", 123.4, 234.5);

      verifyStartCameraUpdateNotCalled();
    });
  });

  describe("mouseMove", () => {
    function verifyUpdateCameraCalled(x, y) {
      expect(cameraController.updateCamera.mock.calls.length).toBe(1);
      expect(cameraController.updateCamera.mock.calls[0][0]).toBe(x);
      expect(cameraController.updateCamera.mock.calls[0][1]).toBe(y);
    }

    function verifyUpdateCameraNotCalled() {
      expect(cameraController.updateCamera.mock.calls.length).toBe(0);
    }

    test("will update camera if in progress", () => {
      setInProgress(true);

      const expectedX = 123.4;
      const expectedY = 234.5;

      patient.mouseMove(expectedX, expectedY);

      verifyUpdateCameraCalled(expectedX, expectedY);
    });

    test("will not update camera update if not in progress", () => {
      setInProgress(false);

      const expectedX = 123.4;
      const expectedY = 234.5;

      patient.mouseMove(expectedX, expectedY);

      verifyUpdateCameraNotCalled();
    });
  });

  describe("mouseUp", () => {
    function verifyFinishCameraUpdateCalled() {
      expect(cameraController.finishCameraUpdate.mock.calls.length).toBe(1);
    }

    function verifyFinishCameraUpdateNotCalled() {
      expect(cameraController.finishCameraUpdate.mock.calls.length).toBe(0);
    }

    test("will finish camera update if in progress", () => {
      setInProgress(true);

      patient.mouseUp();

      verifyFinishCameraUpdateCalled();
    });

    test("will not update camera update if not in progress", () => {
      setInProgress(false);

      patient.mouseMove();

      verifyFinishCameraUpdateNotCalled();
    });
  });
});
