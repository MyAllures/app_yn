import React, { Component } from 'react'
import { NativeRouter} from 'react-router-native'
import store from './src/store/configure-store'
import { Provider } from 'react-redux'
import App from './src/components/App.js'

export default () => {
  return (
    <Provider store={store}>
      <NativeRouter>
        <App />
      </NativeRouter>
    </Provider>
  )
}
