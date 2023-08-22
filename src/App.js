import SearchCard from "./components/SearchAndWeatherCards";
import styles from "./App.module.css";

function App() {
  return (
      <main className={styles.mainPage}>
        <SearchCard />
      </main>
  );
}

export default App;
