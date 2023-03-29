import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateNotificationSetting } from '../../Actions/settingsAction';
import { Select, Switch } from '@mantine/core';
import "./SettingStyle.css"


const NotificationSetting = () => {

  const dispatch = useDispatch()
  const { Notification } = useSelector((state) => state.settingsReducer)
  const [value, setValue] = useState(Notification);

  useEffect(() => {
    setValue(Notification)
  }, [Notification])

  const handleChange = (ex, name) => {
    setValue({ ...value, [name]: ex })
  }

  const saveNotification = () => {
    dispatch(updateNotificationSetting(value))
  }

  return (
    <div className="parentSetting">
      <h3>Notification</h3>
      <div className="directionContainer">
        <label htmlFor="direction" className='labels' >Notification Direction:</label>

        <Select
          name="notificationDirection"
          value={value?.notificationDirection}
          onChange={(e) => handleChange(e, "notificationDirection")}
          data={[
            { value: 'top-left', label: 'Top-Left' },
            { value: 'top-center', label: 'Top-Center' },
            { value: 'top-right', label: 'Top-Right' },
            { value: 'bottom-left', label: 'Bottom-Left' },
            { value: 'bottom-center', label: 'Bottom-Center' },
            { value: 'bottom-right', label: 'Bottom-Right' },
          ]}
        />
      </div>

      <div className="directionContainer">
        <label htmlFor="repeat" className='labels'>Notification Display Time:</label>
        <Select
          name="notificationDuration"
          className='selectBox'
          value={value?.notificationDuration}
          onChange={(e) => handleChange(e, "notificationDuration")}
          data={[
            { value: '1000', label: '1 Second' },
            { value: '3000', label: '3 Second' },
            { value: '5000', label: '5 Second' },
          ]}
        />
      </div>

      <div className="directionContainer">
        <label htmlFor="repeat" className='labels'>Notification On / Off:</label>
        <Switch onLabel="ON" offLabel="OFF" color="orange" size="lg" checked={value.notificationOn} onChange={(event) =>  handleChange(event.currentTarget.checked, "notificationOn") } />
        
        
      </div>

      <button className="button setting-button" onClick={saveNotification}>Save</button>
    </div>
  )
}

export default NotificationSetting