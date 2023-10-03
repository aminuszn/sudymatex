import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Styles } from '../lib/constants'
import { supabase } from '../lib/initSupabase'

import { Button, Input, ThemeProvider } from 'react-native-elements'
import { useColorScheme } from 'react-native-appearance'

// let colorScheme = useColorScheme();

const theme = {
  Button: {
    raised: true,
  },
}

function loginInput(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const { theme, updateTheme, replaceTheme } = props
  return (
    <View>
      <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
    </View>
  )
}

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState('')

  const handleLogin = async (type: string, email: string, password: string) => {
    setLoading(type)
    const { error, user } =
      type === 'LOGIN'
        ? await supabase.auth.signIn({ email, password })
        : await supabase.auth.signUp({ email, password })
    if (!error && !user) Alert.alert('Check your email for the login link!')
    if (error) Alert.alert(error.message)
    setLoading('')
  }

  const colorScheme = useColorScheme()

  return (
    <ThemeProvider useDark={colorScheme === 'dark'} theme={theme}>
      <View>
        // use the pre-existing loginInput component that is already defined


        <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
          <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
          />
        </View>
        <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
          <ThemeProvider>
            <Button
              title="Sign in"
              disabled={!!loading.length}
              loading={loading === 'LOGIN'}
              onPress={() => handleLogin('LOGIN', email, password)}
            />
          </ThemeProvider>
        </View>
        <View style={styles.verticallySpaced}>
          <Button
            title="Sign up"
            disabled={!!loading.length}
            loading={loading === 'SIGNUP'}
            onPress={() => handleLogin('SIGNUP', email, password)}
          />
        </View>
      </View>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: Styles.spacing,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
})
