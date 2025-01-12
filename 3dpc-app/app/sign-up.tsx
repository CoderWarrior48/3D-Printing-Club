import { Button, ButtonText } from "@/components/ui/button"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control"
import { AlertCircleIcon } from "@/components/ui/icon"
import { Input, InputField } from "@/components/ui/input"
import { VStack } from "@/components/ui/vstack"
import { Link, useRouter } from "expo-router"
import React from "react"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useAuth } from "./AuthProvider"
import { Heading } from "@/components/ui/heading"
import { Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from "@/components/ui/select"

 export default function Login () {
    const [isInvalid, setIsInvalid] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVerify, setPasswordVerify] = useState("")
    const [grade, setGrade] = useState("")
    const { onLogin, onRegister } = useAuth()

    const router = useRouter()

    const login = async () => {
      const result = await onLogin(email, password)
      if (result && result.error) {
        setIsInvalid(true)
        setErrorMessage(result.msg)
      }
      else {
        setIsInvalid(false)
        router.push("/profile")
      }
    }

    const register = async () => {
      if (email.trim() === "" || password.trim() === "" || passwordVerify.trim() === "" || grade.trim() === "") {
        setIsInvalid(true)
        setErrorMessage("All fields must be filled in")
        return
      }
      if (password != passwordVerify) {
        setIsInvalid(true)
        setErrorMessage("Passwords don't match")
        return
      }
      const result = await onRegister(email, password)
      if (result && result.error) {
        setIsInvalid(true)
        setErrorMessage(result.msg)
      }
      else {
        setIsInvalid(false)
        login()
      }
    }
    return (
      
        
          <VStack className="w-full rounded-md border border-background-200 p-4">
            <Heading size="3xl" style={{textAlign: "center", padding: 30}}>Sign Up</Heading>
            <FormControl
              isInvalid={isInvalid}
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={false}
            >
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input size="md">
                <InputField
                  type="text"
                  placeholder="email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </Input>
              <FormControlLabel>
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Input size="md">
                <InputField
                  type="password"
                  placeholder="password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </Input>
              <Input size="md" className="mt-3">
                <InputField
                  type="password"
                  placeholder="Retype Password"
                  value={passwordVerify}
                  onChangeText={(text) => setPasswordVerify(text)}
                />
              </Input>
              <FormControlLabel>
                <FormControlLabelText>Grade</FormControlLabelText>
              </FormControlLabel>
              
              <Select value={grade} onValueChange={(text) => setGrade(text)}>
                <SelectTrigger variant="outline" size="md" >
                    <SelectInput placeholder="Select option" />
                </SelectTrigger>
                <SelectPortal>
                    <SelectBackdrop/>
                    <SelectContent>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="Freshman" value="freshman" />
                        <SelectItem label="Softmore" value="softmore" />
                        <SelectItem label="Junior" value="junior" />
                        <SelectItem label="Senior" value="senior"/>
                        </SelectContent>
                </SelectPortal>
              </Select>
      

              {/* <FormControlHelper>
                <FormControlHelperText>
                  Must be at least 6 characters.
                </FormControlHelperText>
              </FormControlHelper> */}
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {errorMessage}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <Button className="w-fit mt-4" size="sm" onPress={register}>
              <ButtonText>Create Account</ButtonText>
            </Button>
            <Text>Grade: {grade}</Text>
          </VStack>
    )
}