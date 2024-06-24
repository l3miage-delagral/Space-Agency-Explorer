import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CountdownProps {
  targetDate: Date;
}

const Countdown = ({ targetDate }: CountdownProps) => {
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const difference = new Date(targetDate).getTime() - now;

    const days = Math.abs(Math.floor(difference / (1000 * 60 * 60 * 24)));
    const hours = Math.abs(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = Math.abs(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = Math.abs(Math.floor((difference % (1000 * 60)) / 1000));

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { days, hours, minutes, seconds } = timeRemaining;

  return (
    <View style={styles.countdownContainer}>
      <Text style={styles.countdownText}>
        {String(days).padStart(2, '0')} : {String(hours).padStart(2, '0')} : {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
      </Text>
      <View style={styles.labelsContainer}>
        <Text style={styles.labelText}>Days</Text>
        <Text style={styles.labelText}>Hours</Text>
        <Text style={styles.labelText}>Mins</Text>
        <Text style={styles.labelText}>Secs</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  countdownContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  countdownText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 5,
  },
  labelText: {
    fontSize: 14,
  },
  targetDateText: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
  },
});

export default Countdown;
