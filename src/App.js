import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Button} from 'react-native';
import GoalItem from './goalItem.js';
import GoalInput from './GoalInput.js';
export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  console.log(courseGoals);
  const addGoalHandler = goalText => {
    if (goalText.length === 0) {
      return;
    }
    setCourseGoals(currentGoals => [
      ...currentGoals,
      {key: Math.random().toString(), value: goalText},
    ]);
    setIsAddMode(false);
  };
  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.key !== goalId);
    });
  };
  const cancelGoalHandler = () => {
    setIsAddMode(false);
  };
  return (
    <View style={styles.screen}>
      <Button title="add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        onCancel={cancelGoalHandler}
        visible={isAddMode}
        onAddGoal={addGoalHandler}
      />
      <FlatList
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            id={itemData.item.key}
            onDelete={removeGoalHandler}
            text={itemData.item.value}
          />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
