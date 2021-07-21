import React , {useState,useEffect} from 'react';
import { StyleSheet,Dimensions,Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {LineChart,BarChart,PieChart} from "react-native-chart-kit";

export default function App() {

    const [desc,setDesc] = useState("");
    const [amount,setAmount] = useState("");
    const [total,setTotal] = useState();
    const [shows,setShow] = useState([])

    useEffect(()=>{
      setTotal(shows.reduce((total,show)=>{
        return total+Number(show.Amount)
      },0));
    },[shows])

    const addshow=()=>{
      setShow([...shows,{
        Desc:desc,
        Amount:amount,
      }])

        setDesc("");
        setAmount("");
    }

  
    
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.heading}>hey there welcome to my amount tracking app please put your description and amount to start tracking.</Text>
        <Text style={styles.track}>Total income is :- ${total}</Text>
      </View>
      <View>
          <Text>Bezier Line Chart</Text>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
      <View style={styles.view1}>
        <TextInput style={styles.input}
         value={desc} 
         onChange={text=>setDesc(text.target.value)}  
         placeholder="Enter a description" />
        <TextInput style={styles.input} 
        value={amount} 
        onChange={text=>setAmount(text.target.value)} 
        placeholder="Enter the amount you made in usd($)" />
        <TouchableOpacity 
        disabled={!amount && !desc} 
        onPress={addshow} 
        style={styles.btn}><Text>Add Gigs</Text></TouchableOpacity>
      </View>
      <ScrollView>
        { shows && shows.map(show=>(
          <View style={{marginTop:5,marginBottom:5,borderTopWidth:1,borderTopColor:"#333",
          display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <Text style={{fontSize:20,fontWeight:"light"}}>{show.Desc}</Text>
            <Text style={{fontSize:22,fontWeight:"bolder"}}>
              ${show.Amount}</Text>
          </View>
        ))}
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    height:"100vh",
    width:"100vw",
  },
  view1:{
    padding:10,
  },
  heading:{
    fontSize:20,
    fontWeight:'bold',
  },
  track:{
    fontSize:15,
    marginTop:10,
  },
  input:{
    marginTop:3,
    marginBottom:3,
    fontSize:15,
    color:"#000",
    padding:8,
    borderWidth:1,
    borderColor:"#000",
    borderRadius:3,
  },
  btn:{
    textAlign:"center",
    marginTop:5,
    marginBottom:3,
    fontSize:15,
    textTransform:"uppercase",
    color:"#fff",
    backgroundColor:"cyan",
    padding:8,
    borderRadius:3,
  },
});
