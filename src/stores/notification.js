import { defineStore } from "pinia";
import { reactive, readonly, ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {
  const loader = ref(false);
  const _timeout = ref();
  const _failures = ref({});

  const _alert = reactive({
    show: false,
    message: null,
    color: null,
  });

  const _confirmation = reactive({
    show: false,
    message: null,
    arg: null,
    action: () => {},
  });

  function _alertDiplay(color, msg) {
    if (!msg) return;

    if (typeof msg !== "string") {
      if (msg.length < 1) {
        return;
      }
    }

    _alert.color = color;
    _alert.message = msg;
    _alert.show = true;
  }

  function alertHide() {
    _alert.color = null;
    _alert.message = null;
    _alert.show = false;
  }

  function alertBasic(msg) {
    _alertDiplay("secondary", msg);
  }

  function alertSuccess(msg) {
    _alertDiplay("success", msg);
  }

  function alertDanger(msg) {
    _alertDiplay("danger", msg);
  }

  function alertWarning(msg) {
    _alertDiplay("warning", msg);
  }

  function confirmationDisplay(msg, fnCallback, arg) {
    _confirmation.message = msg;
    _confirmation.action = fnCallback;
    _confirmation.arg = arg;
    _confirmation.show = true;
  }

  function confirmationHide(option) {
    if (option === true && _confirmation.action)
      _confirmation.action(_confirmation.arg);
    _confirmation.show = false;
    _confirmation.message = null;
    _confirmation.arg = null;
    _confirmation.action = () => {};
  }

  function addFailures(failures) {
    _failures.value = {};

    if (_timeout.value) {
      clearTimeout(_timeout.value);
      _timeout.value = null;
    }

    if (Object.keys(failures) < 1) return;

    _failures.value = Object.assign({}, failures);

    _timeout.value = setTimeout(() => {
      _failures.value = {};
    }, 5000);
  }

  function clearFailures() {
    _failures.value = {};

    if (_timeout.value) {
      clearTimeout(_timeout.value);
      _timeout.value = null;
    }
  }

  return {
    loader,
    failures: readonly(_failures),
    alert: readonly(_alert),
    confirmation: readonly(_confirmation),
    alertBasic,
    alertSuccess,
    alertDanger,
    alertHide,
    alertWarning,
    confirmationDisplay,
    confirmationHide,
    addFailures,
    clearFailures,
  };
});
