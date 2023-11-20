import '@/styles/globals.css'


import { VotingProvider } from '@/context/Voter'
import NavBar from '@/components/Navbar/Navbar'


const App = ({ Component, pageProps }) => {
  return <VotingProvider>
    <div>

      <div>
        <Component {...pageProps} />;
      </ div>

    </div>
  </VotingProvider>
};

export default App;
