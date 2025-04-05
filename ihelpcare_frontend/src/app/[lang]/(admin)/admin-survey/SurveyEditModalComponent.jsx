import { CloseOutlined } from '@ant-design/icons';
import SharedError from '@components/shared/SharedError';
import { CloseIcon } from '@components/shared/SharedIconPack';
import SharedLoader from '@components/shared/SharedLoader';
import useFetchData from '@hooks/useFetchData';
import usePostData from '@hooks/usePostData';
import { getLocale } from '@root/i18n.config';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
} from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

export default function SurveyEditModalComponent({
  surveyEditModal,
  setSurveyEditModal,
  openNotificationWithIcon,
  setSurveyFetchAgain,
}) {
  const lang = useSelector((state) => state.content.lang);
  const [form] = Form.useForm();
  const locale = getLocale();

  // fetch question type API's data
  const [loadingQuestionType, errorQuestionType, dataQuestionType] =
    useFetchData('/question-type-list');

  // fetch survey details API's data
  const [loadingSurveyDetails, errorSurveyDetails, dataSurveyDetails] = useFetchData(
    `/survey/${surveyEditModal?.surveyId}`
  );

  // if survey details data available to set form
  useEffect(() => {
    if (dataSurveyDetails) {
      form.setFieldsValue({
        title_en: dataSurveyDetails?.data?.title_en,
        title_ph: dataSurveyDetails?.data?.title_ph,
        description_en: dataSurveyDetails?.data?.description_en,
        description_ph: dataSurveyDetails?.data?.description_ph,
        survey_date: [
          dayjs(dataSurveyDetails?.data?.start_date),
          dayjs(dataSurveyDetails?.data?.end_date),
        ],
        question: dataSurveyDetails?.data?.questions?.map((ques) => ({
          id: ques?.id,
          title_en: ques?.title_en,
          title_ph: ques?.title_ph,
          tag_en: ques?.tag_en,
          tag_ph: ques?.tag_ph,
          question_type_id: ques?.question_type_id,
          multi_select: ques?.multi_select || false,
          option: ques?.options?.map((opt) => ({
            id: opt?.id,
            option_title_en: opt?.option_title_en,
            option_title_ph: opt?.option_title_ph,
          })),
        })),
        survey_link: dataSurveyDetails?.data?.survey_link,
        provider_type: dataSurveyDetails?.data?.provider_type,
        participator_role: dataSurveyDetails?.data?.participator_role,
      });
    }
  }, [dataSurveyDetails]);

  // survey edit API's implementation
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
        success?.message || 'Survey updated successfully!'
      );
      setSurveyEditModal((prevState) => ({ ...prevState, open: false, surveyId: null }));
      setSurveyFetchAgain((prevState) => !prevState);
      form.resetFields();
    }
  }, [success]);

  // function to handle submit form
  const onFinish = (values) => {
    postData(`/survey/${surveyEditModal?.surveyId}`, {
      title_en: values?.title_en,
      title_ph: values?.title_ph,
      description_en: values?.description_en,
      description_ph: values?.description_ph,
      start_date: dayjs(values?.survey_date?.[0]).format('YYYY-MM-DD'),
      end_date: dayjs(values?.survey_date?.[1]).format('YYYY-MM-DD'),
      question: values?.question?.map((ques) => ({
        id: ques?.id || null,
        title_en: ques?.title_en,
        title_ph: ques?.title_ph,
        tag_en: ques?.tag_en,
        tag_ph: ques?.tag_ph,
        question_type_id: ques?.question_type_id,
        multi_select: ques?.multi_select || false,
        option: ques?.option?.map((opt) => ({
          id: opt?.id || null,
          option_title_en: opt?.option_title_en,
          option_title_ph: opt?.option_title_ph,
        })),
      })),
      survey_link: values?.survey_link,
      provider_type: dataSurveyDetails?.data?.provider_type,
      participator_role: values?.participator_role,
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
      open={surveyEditModal?.open}
      // prettier-ignore
      title={(
        <div>
          <h2 className='text-[20px] font-font-semi-bold lg:text-[24px]'>
            {`#${surveyEditModal?.surveyId}. Survey Edit:`}
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
        // prettier-ignore
        onClick={() => setSurveyEditModal((prevState) => (
          { ...prevState, open: false, surveyId: null }
        ))}
        icon={<CloseIcon />}
        size='large'
        type='link'
      />

      {loadingQuestionType || loadingSurveyDetails ? (
        <SharedLoader />
      ) : errorQuestionType || errorSurveyDetails ? (
        <SharedError error={errorQuestionType || errorSurveyDetails} />
      ) : (
        <Form
          form={form}
          name='iHelp-create-edit-form'
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

            {dataSurveyDetails.data.survey_link ? (
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
            ) : (
              <Col span={24}>
                <Form.List name='question'>
                  {(fields, { add, remove }) => (
                    <div>
                      {fields?.map((field) => (
                        <Card
                          key={uuid()}
                          className='mb-5 w-full border-[1px] border-solid border-color-bg-dark'
                          title={`Question ${field.name + 1}: `}
                          extra={
                            field?.key !== 0 && <CloseOutlined onClick={() => remove(field.name)} />
                          }
                        >
                          <Form.Item
                            label='Question Id'
                            name={[field.name, 'id']}
                            hidden
                          >
                            <Input
                              placeholder='Question Id'
                              size='large'
                              allowClear
                            />
                          </Form.Item>

                          <Row gutter={[20, 5]}>
                            <Col
                              span={24}
                              lg={12}
                            >
                              <Form.Item
                                label='Question Title (English)'
                                name={[field.name, 'title_en']}
                                rules={[
                                  {
                                    type: 'string',
                                    required: true,
                                    message:
                                      lang?.field_is_required?.[locale] || 'Field is required',
                                  },
                                ]}
                              >
                                <Input
                                  placeholder='Question Title (English)'
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
                                label='Question Title (Filipino)'
                                name={[field.name, 'title_ph']}
                                rules={[
                                  {
                                    type: 'string',
                                    required: true,
                                    message:
                                      lang?.field_is_required?.[locale] || 'Field is required',
                                  },
                                ]}
                              >
                                <Input
                                  placeholder='Question Title (Filipino)'
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
                                label='Question Tag (English)'
                                name={[field.name, 'tag_en']}
                                rules={[
                                  {
                                    type: 'string',
                                    required: true,
                                    message:
                                      lang?.field_is_required?.[locale] || 'Field is required',
                                  },
                                ]}
                              >
                                <Input
                                  placeholder='Question Tag (English)'
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
                                label='Question Title (Filipino)'
                                name={[field.name, 'tag_ph']}
                                rules={[
                                  {
                                    type: 'string',
                                    required: true,
                                    message:
                                      lang?.field_is_required?.[locale] || 'Field is required',
                                  },
                                ]}
                              >
                                <Input
                                  placeholder='Question Title (Filipino)'
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
                                label='Question Type'
                                name={[field.name, 'question_type_id']}
                                rules={[
                                  {
                                    type: 'number',
                                    required: true,
                                    message:
                                      lang?.field_is_required?.[locale] || 'Field is required',
                                  },
                                ]}
                              >
                                <Select
                                  placeholder='-- Question Type --'
                                  options={dataQuestionType?.data?.map((data) => ({
                                    value: data?.id,
                                    label: data?.type,
                                  }))}
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
                                label='Multi Options Selectable'
                                name={[field.name, 'multi_select']}
                                valuePropName='checked'
                                noStyle
                              >
                                <Checkbox className='pt-11'>Multiple chose options?</Checkbox>
                              </Form.Item>
                            </Col>

                            <Col span={24}>
                              <Form.Item>
                                <Form.List name={[field.name, 'option']}>
                                  {(subFields, subOpt) => (
                                    <div>
                                      {subFields?.map((subField) => (
                                        <Card
                                          key={uuid()}
                                          className='mb-2 w-full border-[1px] border-solid border-color-gray'
                                          title={`Option ${subField.name + 1}: `}
                                          // prettier-ignore
                                          extra={(
                                            <CloseOutlined
                                              onClick={() => subOpt.remove(subField.name)}
                                            />
                                          )}
                                          size='small'
                                        >
                                          <Form.Item
                                            label='Option Id'
                                            name={[subField.name, 'id']}
                                            hidden
                                          >
                                            <Input
                                              placeholder='Option Id'
                                              size='large'
                                              allowClear
                                            />
                                          </Form.Item>

                                          <Row gutter={[20, 5]}>
                                            <Col
                                              span={24}
                                              lg={12}
                                            >
                                              <Form.Item
                                                label='Option Title (English)'
                                                name={[subField.name, 'option_title_en']}
                                                rules={[
                                                  {
                                                    type: 'string',
                                                    required: true,
                                                    message:
                                                      lang?.field_is_required?.[locale] ||
                                                      'Field is required',
                                                  },
                                                ]}
                                              >
                                                <Input
                                                  placeholder='Option Title (English)'
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
                                                label='Option Title (Filipino)'
                                                name={[subField.name, 'option_title_ph']}
                                                rules={[
                                                  {
                                                    type: 'string',
                                                    required: true,
                                                    message:
                                                      lang?.field_is_required?.[locale] ||
                                                      'Field is required',
                                                  },
                                                ]}
                                              >
                                                <Input
                                                  placeholder='Option Title (Filipino)'
                                                  size='large'
                                                  allowClear
                                                />
                                              </Form.Item>
                                            </Col>
                                          </Row>
                                        </Card>
                                      ))}

                                      <Button
                                        className='mt-5'
                                        onClick={() => subOpt.add()}
                                        type='dashed'
                                        size='middle'
                                        block
                                      >
                                        + Add Option
                                      </Button>
                                    </div>
                                  )}
                                </Form.List>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Card>
                      ))}

                      <Button
                        className='my-5'
                        onClick={() => add()}
                        type='dashed'
                        size='middle'
                        block
                      >
                        + Add Question
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Col>
            )}

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
                  Update
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
}

SurveyEditModalComponent.propTypes = {
  surveyEditModal: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    surveyId: PropTypes.number.isRequired,
  }).isRequired,
  setSurveyEditModal: PropTypes.func.isRequired,
  openNotificationWithIcon: PropTypes.func.isRequired,
  setSurveyFetchAgain: PropTypes.func.isRequired,
};
