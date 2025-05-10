import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../store/AuthContext';
import { otpSchema } from '../../schema/otpSchema';
import type {otpField} from '../../schema/otpSchema'
import { verificationStyles } from './verification.style';
import { useTheme } from '../../store/themeContext';
import LinearGradient from "react-native-linear-gradient"
const Verification = () => {
    const {theme} = useTheme()
    const {setIsAuthenticated} = useAuth()
    const styles = verificationStyles(theme)
  const { control, handleSubmit } = useForm<otpField>({
    resolver: zodResolver(otpSchema),
    defaultValues: { d1: '', d2: '', d3: '', d4: '' },
  });

  const refs: Record<keyof otpField, React.RefObject<TextInput | null>> = {
    d1: useRef<TextInput | null>(null),
    d2: useRef<TextInput | null>(null),
    d3: useRef<TextInput | null>(null),
    d4: useRef<TextInput | null>(null),
  };
  

  const onSubmit = (data: otpField) => {
    const code = data.d1 + data.d2 + data.d3 + data.d4;
    if (code) {
      setIsAuthenticated(true)
    } 
  };

  const renderInput = (name: keyof typeof refs, nextRef: keyof typeof refs | null) => (
    
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextInput
          ref={refs[name]}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={value}
          onChangeText={(text) => {
            onChange(text);
            if (text && nextRef) {
                refs[nextRef]?.current?.focus();
              }
          
          }}
        />
      )}
    />
  );

  return (
    <LinearGradient
        colors={theme.gradient} 
        style={{flexGrow: 1}}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Enter 4-digit Code</Text>
      <View style={styles.inputsRow}>
        {renderInput('d1', 'd2')}
        {renderInput('d2', 'd3')}
        {renderInput('d3', 'd4')}
        {renderInput('d4', null)}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
}

export {Verification}
