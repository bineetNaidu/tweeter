import { Navbar } from '../components/Navbar';
import { withApollo } from '../lib/withApollo';

const Users = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default withApollo({ ssr: true })(Users);
