import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet} from 'react-native'

//create a component
//store our variables, make use of useState to access data

const App =() =>{

  //array to hold the expenses
 // const [expenses, setExpenses] = useState([]);  

  //input for expense desciption
  const [description, setDescription] = useState(''); 

  //input for the expenses amount from user
  const [amount, setAmount] = useState('');

  //take amount user entered and list it is an expense/item
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

 interface ExpenseItem {
  description: string;
  amount: number;
 }

 //function to add a new expene item to the list
 const addExpense =() =>{
   if (description && amount){
    const newExpense ={
      description,
      amount: parseFloat(amount),
    };
    setExpenses([...expenses, newExpense]);  //allows to copy the same item in the same format
    setDescription('');
    setAmount('');
   }
 };

 //create a function to render each expense item in the flatlist
 const renderExpenseItem =({item}: {item: {description:string; amount:number }}) =>(

  <View style={styles.expenseItem}>
  <Text style={styles.expenseDescription}>{item.description}</Text>
  <Text style={styles.expenseAmount}>R{item.amount.toFixed(2)}</Text>
  </View>
 );

 //create a function to calc the total expenses
 //making use of the reduce function , this allows us to accumulate 
 //the items into a single value

 const totalExpenses =expenses.reduce((total, expense) => total + expense.amount, 0);

 //calc the average spent
 const averageSpent = expenses.length === 0?0 :totalExpenses / expenses.length

 //render the UI components
 return(
  <View style={styles.container}>
    <Text style={styles.title}>Expense Tracker App</Text>
   
    <TextInput style={styles.input} placeholder="Description" value={description} 
    onChangeText={setDescription}></TextInput> 
   
    <TextInput style={styles.input} placeholder="Amount" value={amount} 
    onChangeText={setAmount} keyboardType="numeric"></TextInput>
   
    <TouchableOpacity style={styles.addButton} onPress={addExpense}>
      <Text style={styles.buttonText}> Add Expense</Text>
    </TouchableOpacity>

    <Text style={styles.totalText}>Total Expenses:R{totalExpenses.toFixed(2)}</Text>

    <Text style={styles.totalText}>Average Spent:R{averageSpent.toFixed(2)}</Text>

    <FlatList<ExpenseItem>
    data ={expenses} 
    keyExtractor ={(item, index) => index.toString()}
    renderItem ={renderExpenseItem}
    />
  </View>
 );
};

//create stylesheet
//style all components

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#778899',
  },
  title:{
    fontSize:20,
    textAlign:'center',
    fontWeight:'bold',
  },
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  addButton:{
    backgroundColor:'white',
    borderRadius:8,
    paddingVertical:12,
    paddingHorizontal:20,
    marginTop:20,
  },
  buttonText:{
    color:'#000000',
    fontWeight:'bold',
  },
  totalText:{
    fontSize:20,
    fontWeight:'bold',
  },
  expenseItem:{
    fontSize:20,
    textAlign:'center',
    fontWeight:'bold',
    flex:1,
  },
  expenseDescription:{
  fontSize:20,
  textAlign:'center',
  fontWeight:'bold',
  flex:1,
  },
  expenseAmount:{
  fontSize:20,
  textAlign:'center',
  fontWeight:'bold',
  flex:1,
  },
  });
  
  export default App;
  


