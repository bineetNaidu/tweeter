import { Typography, Avatar, Input, Spin } from 'antd';
import { useStore } from '../lib/store';
import { GlobalOutlined, FileImageOutlined } from '@ant-design/icons';
import { Formik, Form } from 'formik';
import styles from '../styles/createTweetForm.module.scss';
import { useCreateTweetMutation } from '../generated/graphql';
import { useState } from 'react';

const { Title } = Typography;
const { TextArea } = Input;
export const CreateTweetForm = () => {
  const [show, setShow] = useState(false);
  const { user } = useStore();
  const [createTweet] = useCreateTweetMutation();
  return (
    <Formik
      initialValues={{ body: '', media: '' }}
      onSubmit={async (values, { setValues }) => {
        if (!values.body) {
          return;
        }
        const computedValues =
          values.media === '' ? { body: values.body } : values;
        await createTweet({
          variables: computedValues,
          update: (cache) => {
            cache.evict({ fieldName: 'tweets' });
          },
        });
        setValues({ body: '', media: '' });
      }}
    >
      {({ isSubmitting, getFieldProps }) => (
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
            <div style={{ flex: 0.97 }}>
              <TextArea
                showCount
                maxLength={200}
                placeholder="What's Happening"
                className="txtarea"
                {...getFieldProps('body')}
              />
              {show ? (
                <Input placeholder="Image Url" {...getFieldProps('media')} />
              ) : null}
            </div>
          </div>

          <div className={styles.createTweetForm__footer}>
            <div className={styles.footer_ctx}>
              <button onClick={() => setShow((prev) => !prev)}>
                <FileImageOutlined />
              </button>
              <button>
                <GlobalOutlined />
                <span>Everyone Can Reply</span>
              </button>
            </div>
            <button className={styles.submit_btn} type="submit">
              {isSubmitting ? <Spin /> : null} Tweet
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
