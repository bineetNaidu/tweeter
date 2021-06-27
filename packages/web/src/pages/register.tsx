import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import { Alert, Button, Card, Form, Input, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import { ErrorMessage, Form as FormikForm, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useRegisterMutation } from '../generated/graphql';
import { withApollo } from '../lib/withApollo';
import { toErrorMap } from '../utils/toErrorMap';

const Register = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Space style={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        style={{
          width: 400,
          textAlign: 'center',
          backgroundColor: '#f3f3f3',
          marginTop: '3rem',
        }}
      >
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            avatar: '',
            first_name: '',
            last_name: '',
          }}
          onSubmit={async (values, { setErrors, setValues }) => {
            const { data } = await register({
              variables: {
                options: values,
              },
            });
            if (data?.register.errors) {
              return setErrors(toErrorMap(data.register.errors));
            } else if (data?.register.token) {
              localStorage.setItem('token:tweeter', data?.register.token!);
              setValues({
                username: '',
                email: '',
                password: '',
                avatar: '',
                first_name: '',
                last_name: '',
              });
              router.push('/');
            }
          }}
        >
          {({ isSubmitting, getFieldProps }) => (
            <FormikForm>
              <Title level={3}>Login to Tweeter</Title>
              <Form.Item name="first_name">
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="first_name"
                  {...getFieldProps('first_name')}
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  render={(message) => <Alert message={message} type="error" />}
                />
              </Form.Item>

              <Form.Item name="last_name">
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="last_name"
                  {...getFieldProps('last_name')}
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  render={(message) => <Alert message={message} type="error" />}
                />
              </Form.Item>
              <Form.Item name="username">
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  {...getFieldProps('username')}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  render={(message) => <Alert message={message} type="error" />}
                />
              </Form.Item>
              <Form.Item name="password">
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  {...getFieldProps('password')}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  render={(message) => <Alert message={message} type="error" />}
                />
              </Form.Item>

              <Form.Item name="email">
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  type="email"
                  placeholder="email"
                  {...getFieldProps('email')}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  render={(message) => <Alert message={message} type="error" />}
                />
              </Form.Item>

              <Form.Item name="avatar">
                <Input
                  prefix={<FileImageOutlined className="site-form-item-icon" />}
                  placeholder="avatar"
                  {...getFieldProps('avatar')}
                />
                <ErrorMessage
                  name="avatar"
                  component="div"
                  render={(message) => <Alert message={message} type="error" />}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={isSubmitting}
                >
                  Register
                </Button>
                <br />
                Or <Link href="/login">login now!</Link>
              </Form.Item>
            </FormikForm>
          )}
        </Formik>
      </Card>
    </Space>
  );
};

export default withApollo()(Register);
