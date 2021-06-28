import { Typography, Avatar, Input, Button } from 'antd';
import { useStore } from '../lib/store';
import { GlobalOutlined, FileImageOutlined } from '@ant-design/icons';
import { Formik, Form } from 'formik';
import styles from '../styles/createTweetForm.module.scss';

const { Title } = Typography;
const { TextArea } = Input;
export const CreateTweetForm = () => {
  const { user } = useStore();
  return (
    <Formik
      initialValues={{ body: '', media: '' }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ isSubmitting, getFieldProps, submitForm }) => (
        <Form className={styles.createTweetForm}>
          <div className={styles.createTweetForm__header}>
            <Title level={5}>Tweet Something</Title>
          </div>

          <div className={styles.createTweetForm__body}>
            <Avatar
              shape="square"
              size="large"
              style={{ borderRadius: 5, marginRight: 10 }}
              src={user?.avatar}
              alt={user?.username}
            />
            <TextArea
              showCount
              maxLength={200}
              placeholder="What's Happening"
              className="txtarea"
              {...getFieldProps('body')}
            />
          </div>

          <div className={styles.createTweetForm__footer}>
            <div className={styles.footer_ctx}>
              <button>
                <FileImageOutlined />
              </button>
              <button>
                <GlobalOutlined />
                <span>Everyone Can Reply</span>
              </button>
            </div>
            <Button loading={isSubmitting} type="primary" onClick={submitForm}>
              Tweet
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
