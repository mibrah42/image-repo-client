import React from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import { secondary } from "./components/Colors";
import Footer from "./components/Footer";
import ImagesContainer from "./components/ImagesContainer";

export default function App() {
  return (
    <div className="App" style={{ backgroundColor: secondary }}>
      <NavigationBar />
      <ImagesContainer />
      <Footer />
    </div>
  );
}
