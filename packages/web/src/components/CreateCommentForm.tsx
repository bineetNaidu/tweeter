import { FC } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import { Input, Avatar } from 'antd';
import styles from '../styles/createCommentForm.module.scss';
import { useStore } from '../lib/store';
import {
  useAddCommentMutation,
  BaseCommentFragment,
} from '../generated/graphql';
import { gql } from '@apollo/client';

interface Props {
  tweetId: number;
}

export const CreateCommentForm: FC<Props> = ({ tweetId }) => {
  const { user } = useStore();
  const [createComment] = useAddCommentMutation();
  return (
    <Formik
      initialValues={{ text: '' }}
      onSubmit={async (values, { setValues }) => {
        await createComment({
          variables: { tweetId, text: values.text },
          update: (cache, { data: gqlData }) => {
            const data = cache.readFragment<{
              id: number;
              comments: BaseCommentFragment;
            }>({
              id: 'Tweet:' + tweetId,
              fragment: gql`
                fragment _ on Tweet {
                  id
                  comments {
                    id
                    text
                  }
                }
              `,
            });
            if (data) {
              cache.writeFragment({
                id: 'Tweet:' + tweetId,
                fragment: gql`
                  fragment __ on Tweet {
                    id
                    comments {
                      id
                    }
                  }
                `,
                data: {
                  comments: { ...gqlData?.addComment },
                  id: tweetId,
                },
              });
            }
          },
        });
        setValues({ text: '' });
      }}
    >
      {({ getFieldProps }) => (
        <FormikForm className={styles.createCommentForm}>
          <Avatar
            shape="square"
            size="large"
            style={{ borderRadius: 5 }}
            src={user!.avatar}
            alt={user!.username}
          />
          <Input {...getFieldProps('text')} className={styles.input_field} />
          <button hidden type="submit">
            Add Comment
          </button>
        </FormikForm>
      )}
    </Formik>
  );
};
