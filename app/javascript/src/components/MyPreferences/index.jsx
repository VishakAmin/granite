import React, { useState, useEffect } from "react";
import preferencesApi from "apis/preferences";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import { getFromLocalStorage } from "helpers/storage";
import PreferenceForm from "./Form";

const MyPreferences = () => {
  const [notificationDeliveryHour, setNotificationDeliveryHour] = useState("");
  const [receiveEmail, setReceiveEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [preferenceId, setPreferenceId] = useState("");
  const userId = getFromLocalStorage("authUserId");

  const updatePreference = async () => {
    try {
      setLoading(true);
      await preferencesApi.update({
        id: preferenceId,
        payload: {
          notification_delivery_hour: notificationDeliveryHour,
          receive_email: receiveEmail,
        },
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPreferenceDetails = async () => {
    try {
      const { data } = await preferencesApi.show(userId);

      setNotificationDeliveryHour(data.preference.notification_delivery_hour);
      setReceiveEmail(data.preference.receive_email);
      setPreferenceId(data.preference.id);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferenceDetails();
  }, []);

  if (pageLoading || !userId || !preferenceId) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <PreferenceForm
        notificationDeliveryHour={notificationDeliveryHour}
        setNotificationDeliveryHour={setNotificationDeliveryHour}
        receiveEmail={receiveEmail}
        setReceiveEmail={setReceiveEmail}
        loading={loading}
        updatePreference={updatePreference}
      />
    </Container>
  );
};

export default MyPreferences;
