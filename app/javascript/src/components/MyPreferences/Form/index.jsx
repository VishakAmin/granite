import React from "react";
import Button from "components/Button";
import Input from "components/Input";
import Select from "react-select";

const defaultTimezone = "UTC";

const PreferenceForm = ({
  notificationDeliveryHour,
  setNotificationDeliveryHour,
  receiveEmail,
  setReceiveEmail,
  loading,
  updatePreference,
}) => {
  const onHandleDeliveryHourChange = event => {
    const regex = /^[0-9\b]*$/;
    const deliveryHour = event.target.value;
    if (!regex.test(deliveryHour)) return null;

    setNotificationDeliveryHour(deliveryHour);
  };

  const handleSubmit = () => {
    event.preventDefault();
    updatePreference();
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <div className="flex justify-between text-bb-gray-600 mt-10">
        <h1 className="pb-3 mt-5 text-2xl leading-5 font-bold">
          Delivery Hour For Mail
        </h1>
      </div>

      <div className="flex justify-between text-gray-700 mb-5">
        Set your preferred hour to receive mail with your pending tasks, if any
      </div>

      <div>
        <p className="leading-5 font-medium text-bb-gray-700 text-sm my-3">
          Delivery Timezone
        </p>
        <div className="w-full">
          <Select
            options={defaultTimezone}
            defaultValue={defaultTimezone}
            placeholder={defaultTimezone}
            isDisabled={true}
          />
        </div>
      </div>

      <div className="w-2/6">
        <Input
          type="number"
          label="Delivery Time (Hours)"
          placeholder="Enter hour"
          min={0}
          max={23}
          value={notificationDeliveryHour}
          onChange={onHandleDeliveryHourChange}
        />
      </div>

      <div className="flex items-center w-2/6 mt-5 ">
        <input
          type="checkbox"
          id="receiveEmail"
          checked={receiveEmail}
          className="w-4 h-4 text-bb-purple border-gray-300 rounded form-checkbox focus:ring-bb-purple cursor-pointer"
          onChange={e => setReceiveEmail(e.target.checked)}
        />
        <label className="ml-2">Receive Mail</label>
      </div>

      <div className="w-2/6">
        <Button
          type="submit"
          buttonText="Update Preferences"
          loading={loading}
        />
      </div>
    </form>
  );
};

export default PreferenceForm;
