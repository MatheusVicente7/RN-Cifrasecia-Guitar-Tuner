import React, { Component } from "react";
import { View, Text, StatusBar, StyleSheet, Image } from "react-native";
import Tuner from "./src/tuner";
import Note from "./src/note";
import Meter from "./src/meter";

import logo from "./assets/imgs/Logo.png"

export default class App extends Component {
  state = {
    note: {
      name: "A",
      octave: 4,
      frequency: 440
    }
  };

  _update(note) {
    this.setState({ note });
  }

  componentDidMount() {
    const tuner = new Tuner();
    tuner.start();
    tuner.onNoteDetected = note => {
      if (this._lastNoteName === note.name) {
        this._update(note);
      } else {
        this._lastNoteName = note.name;
      }
    };
  }

  render() {
    return (
      <View style={style.body}>
        <Image source ={logo} style= {style.logo} resizeMode = "contain"></Image>
        <StatusBar backgroundColor="#283547" translucent />
        <Meter cents={this.state.note.cents} />
        <Note {...this.state.note} />
        <Text style={style.frequency}>
          {this.state.note.frequency.toFixed(1)} Hz
        </Text>
        
      </View>
    );
  }
}

const style = StyleSheet.create({
  body: {
    flex: 2,
    backgroundColor: '#283547',
    justifyContent: "center",
    alignItems: "center"
  },
  container: {

  },
  frequency: {
    fontSize: 28,
    color: "#FFF"
  },
  logo:{
    width: "60%",
    height: "10%",
    top: -10,
    left: 5
    
  }
    
  
});
