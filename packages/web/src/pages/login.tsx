import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Form, Input, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import { ErrorMessage, Form as FormikForm, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useLoginMutation } from '../generated/graphql';
import { withApollo } from '../lib/withApollo';
import { toErrorMap } from '../utils/toErrorMap';

const Login = () => {
  const router = useRouter();
  const [login] = useLoginMutation();
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
          initialValues={{ username: '', password: '' }}
          onSubmit={async (values, { setErrors, setValues }) => {
            const { data } = await login({
              variables: values,
            });
            if (data?.login.errors) {
              return setErrors(toErrorMap(data.login.errors));
            } else if (data?.login.token) {
              localStorage.setItem('token:tweeter', data?.login.token!);
              setValues({ username: '', password: '' });
              router.push('/');
            }
          }}
        >
          {({ isSubmitting, getFieldProps }) => (
            <FormikForm>
              <Title level={3}>Login to Tweeter</Title>
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
              <Link href="/forgot-password">Forgot password</Link>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={isSubmitting}
                >
                  Log in
                </Button>
                <br />
                Or <Link href="/register">register now!</Link>
              </Form.Item>
            </FormikForm>
          )}
        </Formik>
      </Card>
    </Space>
  );
};

export default withApollo()(Login);
