import Title from "../Components/Title";
import Header from "../Components/Header";
import Form from "../Components/Form";
import Metrics from "../Components/Metrics";
import References from "../Components/References";
import Footer from "../Components/Footer";
import { useState } from "react";
import Results from "../Components/Results";

function App() {
  const [totalPoints, setTotalPoints] = useState(0);

  return (
    <div className="overflow-x-hidden">
      <Header />
      <Title />
      <Form setTotalPoints={setTotalPoints} />
      <Results totalPoints={totalPoints} />
      <Metrics totalPoints={totalPoints} />
      <References />
      <Footer />
    </div>
  );
}

export default App;
