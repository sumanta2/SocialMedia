import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateAnimationSetting } from '../../Actions/settingsAction';
import { Select } from '@mantine/core';

import "./SettingStyle.css"

const AnimationSetting = () => {
  const [value, setValue] = useState(null)
  const dispatch = useDispatch()

  const { Animation } = useSelector((state) => state.settingsReducer)

  useEffect(() => {
    setValue(Animation)
  }, [Animation])


  const handleChange = (e, name) => {
    setValue({ ...value, [name]: e })
  }

  const saveAnimation = () => {
    dispatch(updateAnimationSetting(value))
  }
  return (
    <div className="parentSetting">
      <h3>Animation</h3>
      <div className="directionContainer">
        <label htmlFor="repeat" className='labels'>Animation Repeat Type:</label>
        <Select
          name="animationRepeatType"
          className='selectBox'
          value={value?.animationRepeatType}
          onChange={(e) => handleChange(e, "animationRepeatType")}
          data={[
            { value: 'one', label: 'Only First Time' },
            { value: 'loop', label: 'Loop' },
            { value: 'none', label: 'No animation' },
          ]}
        />
      </div>

      <button className="button setting-button" onClick={saveAnimation} >Save</button>
    </div>
  )
}

export default AnimationSetting