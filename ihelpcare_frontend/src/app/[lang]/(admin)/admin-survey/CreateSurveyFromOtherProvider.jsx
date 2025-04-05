import { CloseIcon } from '@components/shared/SharedIconPack';
import usePostData from '@hooks/usePostData';
import { getLocale } from '@root/i18n.config';
import { Button, Col, DatePicker, Divider, Form, Input, Modal, Radio, Row } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function CreateSurveyFromOtherProvider({
  createOtherSurveyModalOpen,
  setCreateOtherSurveyModalOpen,
  openNotificationWithIcon,
  setSurveyFetchAgain,
  providerTypeId,
}) {
  const lang = useSelector((state) => state.content.lang);
  const [form] = Form.useForm();
  const locale = getLocale();

  // survey create API's implementation
  const [postData, loading, error, success] = usePostData();

  useEffect(() => {
    if (error) {
      openNotificationWithIcon('error', 'ERROR', error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      openNotificationWithIcon(
        'success',
        'SUCCESS',
        success?.message || 'New survey created successfully!'
      );
      setSurveyFetchAgain((prevState) => !prevState);
      setCreateOtherSurveyModalOpen(false);
      form.resetFields();
    }
  }, [success]);

  // function to handel submit form
  const onFinish = (values) => {
    postData('/survey', {
      title_en: values?.title_en,
      title_ph: values?.title_ph,
      description_en: values?.description_en,
      description_ph: values?.description_ph,
      start_date: dayjs(values?.survey_date?.[0]).format('YYYY-MM-DD'),
      end_date: dayjs(values?.survey_date?.[1]).format('YYYY-MM-DD'),
      participator_role: values?.participator_role,
      question: values?.question?.map((ques) => ({
        title_en: ques?.null,
        title_ph: ques?.null,
        tag_en: ques?.null,
        tag_ph: ques?.null,
        question_type_id: ques?.null,
        multi_select: ques?.multi_select || false,
        option: ques?.option?.map((opt) => ({
          option_title_en: opt?.null,
          option_title_ph: opt?.null,
        })),
      })),
      survey_link: values?.survey_link,
      provider_type: providerTypeId,
    });
  };

  const selectParticipatorRole = [
    { label: 'Caregiver', value: 3 },
    { label: 'Patient', value: 4 },
    // Add more options as needed
  ];

  return (
    <Modal
      className='relative my-5 lg:my-10'
      open={createOtherSurveyModalOpen}
      // prettier-ignore
      title={(
        <div>
          <h2 className='text-[20px] font-font-semi-bold lg:text-[24px]'>
            Create New Survey
          </h2>
          <Divider className='!mt-0 !pt-0' />
        </div>
      )}
      closable={false}
      width={992}
      footer={[]}
      centered
    >
      <Button
        className='absolute right-5 top-5'
        onClick={() => setCreateOtherSurveyModalOpen(false)}
        icon={<CloseIcon />}
        size='large'
        type='link'
      />

      <Form
        form={form}
        name='iHelp-create-provider-survey-form'
        initialValues={{ question: [{}] }}
        onFinish={onFinish}
        scrollToFirstError
        layout='vertical'
      >
        <Row gutter={[20, 5]}>
          <Col
            span={24}
            lg={12}
          >
            <Form.Item
              label='Title (English)'
              name='title_en'
              rules={[
                {
                  type: 'string',
                  required: true,
                  message: lang?.field_is_required?.[locale] || 'Field is required',
                },
              ]}
            >
              <Input
                placeholder='Title (English)'
                size='large'
                allowClear
              />
            </Form.Item>
          </Col>

          <Col
            span={24}
            lg={12}
          >
            <Form.Item
              label='Title (Filipino)'
              name='title_ph'
              rules={[
                {
                  type: 'string',
                  required: true,
                  message: lang?.field_is_required?.[locale] || 'Field is required',
                },
              ]}
            >
              <Input
                placeholder='Title (Filipino)'
                size='large'
                allowClear
              />
            </Form.Item>
          </Col>

          <Col
            span={24}
            lg={12}
          >
            <Form.Item
              label='Description (English)'
              name='description_en'
              rules={[
                {
                  type: 'string',
                  required: true,
                  message: lang?.field_is_required?.[locale] || 'Field is required',
                },
              ]}
            >
              <Input.TextArea
                placeholder='Description (English)'
                size='large'
                allowClear
                rows={2}
              />
            </Form.Item>
          </Col>

          <Col
            span={24}
            lg={12}
          >
            <Form.Item
              label='Description (Filipino)'
              name='description_ph'
              rules={[
                {
                  type: 'string',
                  required: true,
                  message: lang?.field_is_required?.[locale] || 'Field is required',
                },
              ]}
            >
              <Input.TextArea
                placeholder='Description (Filipino)'
                size='large'
                allowClear
                rows={2}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label='Survey (Start Date to End Date)'
              name='survey_date'
              rules={[
                {
                  required: true,
                  message: lang?.field_is_required?.[locale] || 'Field is required',
                },
              ]}
            >
              <DatePicker.RangePicker
                className='w-full'
                placeholder={['Start Date', 'End Date']}
                size='large'
                allowClear
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name='participator_role' // Name for the field when submitting the form
              label='Participant'
              rules={[
                {
                  required: true,
                  message: lang?.field_is_required?.[locale] || 'Field is required',
                },
              ]}
            >
              <Radio.Group>
                {selectParticipatorRole.map((option) => (
                  <Radio
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label='Survey Link'
              name='survey_link'
              rules={[
                {
                  type: 'url',
                  required: true,
                  message: lang?.field_is_required?.[locale] || 'Field is required',
                },
              ]}
            >
              <Input
                placeholder='Survey Link'
                size='large'
                allowClear
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <Button
                className='btn-primary'
                htmlType='submit'
                type='primary'
                size='large'
                block
                loading={loading}
                disabled={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

CreateSurveyFromOtherProvider.propTypes = {
  createOtherSurveyModalOpen: PropTypes.bool.isRequired,
  setCreateOtherSurveyModalOpen: PropTypes.func.isRequired,
  openNotificationWithIcon: PropTypes.func.isRequired,
  setSurveyFetchAgain: PropTypes.func.isRequired,
  providerTypeId: PropTypes.string.isRequired,
};
