import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useState } from 'react';
import { Button, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {

  const [firstInput, setFirstInput] = useState<number>(0);
  const [secondInput, setSecondInput] = useState<number>(0);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFirstChange = (text: string) => {
    const value = parseFloat(text);
    setFirstInput(isNaN(value) ? 0 : value);
  }

  const handleSecondChange = (text: string) => {
    const value = parseFloat(text);
    setSecondInput(isNaN(value) ? 0 : value);
  }

  const generateRandomNumber = () => {
    if (firstInput >= secondInput) {
      setErrorMessage("O número máximo deve ser maior que o número mínimo.");
      setRandomNumber(null);
      return;
    } else {
      setErrorMessage(null);
    }

    let random: number;
    do {
      random = Math.floor(Math.random() * (secondInput - firstInput - 1)) + firstInput + 1;
    } while (random === firstInput || random === secondInput);

    setRandomNumber(random);
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('@/assets/images/game.png')} style={styles.img} />
        <Text style={styles.text}>Um jogo divertido para todos!</Text>

        <View style={styles.instructions}>
          <View style={styles.iconTextContainer}>
            <IconSymbol size={28} name="doc.fill" color="white" />
            <Text style={styles.text}>Instruções:</Text>
          </View>
          <Text style={styles.text}>1. Indique um valor mínimo</Text>
          <Text style={styles.text}>2. Indique um valor máximo</Text>
          <Text style={styles.text}>3. Veja o sistema gerar um número aleatório entre o máximo e mínimo que você informou, mas não igual a nenhum deles!</Text>
        </View>

        <TextInput
          style={styles.input}
          value={firstInput.toString()}
          onChangeText={handleFirstChange}
          keyboardType="numeric"
          placeholder="Digite o número MÍNIMO"
        />
        <TextInput
          style={styles.input}
          value={secondInput.toString()}
          onChangeText={handleSecondChange}
          keyboardType="numeric"
          placeholder="Digite o número MÁXIMO"
        />
        <Button title="Gerar Número Aleatório" onPress={generateRandomNumber} />

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        {randomNumber !== null && (
          <Text style={styles.text}>Número aleatório: {randomNumber}</Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 280,
  },
  container: {
    flex: 1,
    backgroundColor: '#082c2c',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  instructions: {
    marginTop: 20,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    marginTop: 20,
    paddingLeft: 10,
    borderRadius: 5,
    color: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  }
});