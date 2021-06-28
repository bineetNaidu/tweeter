import { Spin } from 'antd';
import { CreateTweetForm } from '../components/CreateTweetForm';
import { Navbar } from '../components/Navbar';
import { TweetCard } from '../components/TweetCard';
import { useTweetsQuery } from '../generated/graphql';
import { withApollo } from '../lib/withApollo';

const Home = () => {
  const { data, loading } = useTweetsQuery();
  return (
    <div>
      <Navbar />
      <CreateTweetForm />
      {loading && !data ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spin />
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {data?.tweets.map((t) => (
            <TweetCard tweet={t} key={t.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default withApollo({ ssr: true })(Home);
