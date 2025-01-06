import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Input, InputField } from '@/components/ui/input';
import { Icon } from 'react-native-paper';
import { Button, ButtonText } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';


export default function Login() {
  return (
    <VStack justifyContent="space-between">

      
      <Input variant="outline" size="md" >
          <InputField
            placeholder='Username'
          />
        </Input>
        <Input variant="outline" size="md">
          <InputField
            placeholder='Password'
          />
        </Input>
        
        <Button size="md" variant="solid" action="primary" >
          <ButtonText>Hello World!</ButtonText>
        </Button>
      
      
    </VStack>
  )
}