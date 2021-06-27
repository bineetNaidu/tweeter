import { Typography } from 'antd';
import { Navbar } from '../components/Navbar';
import { withApollo } from '../lib/withApollo';

const { Title } = Typography;

const Home = () => {
  return (
    <div>
      <Navbar />
      <Title>Hello Tweeter</Title>
    </div>
  );
};

export default withApollo()(Home);
