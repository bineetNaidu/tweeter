import { Spin, Divider, Typography } from 'antd';
import { Navbar } from '../components/Navbar';
import { TweetCard } from '../components/TweetCard';
import { useBookmarksQuery } from '../generated/graphql';
import { withApollo } from '../lib/withApollo';

const Bookmarks = () => {
  const { data, loading } = useBookmarksQuery();
  return (
    <div>
      <Navbar />
      <div>
        <Typography>Your Bookmarks</Typography>
        <Divider />
      </div>

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
          {data?.bookmarks.map((t) => (
            <TweetCard tweet={t.tweet} key={t.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default withApollo({ ssr: false })(Bookmarks);
