import SharedError from '@components/shared/SharedError';
import { CloseIcon } from '@components/shared/SharedIconPack';
import SharedLoader from '@components/shared/SharedLoader';
import useFetchData from '@hooks/useFetchData';
import { getLocale } from '@root/i18n.config';
import {
  Button,
  Checkbox,
  Col,
  Descriptions,
  Divider,
  Input,
  Modal,
  Radio,
  Row,
  Space,
} from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

export default function ReportDetailsViewModal({ detailsViewModal, setDetailsViewModal }) {
  const locale = getLocale();

  // fetch survey response API's data
  const [loadingResponse, errorResponse, dataResponse] = useFetchData(
    `/survey-response-details/${detailsViewModal?.responseId}`
  );

  return (
    <Modal
      className='relative my-5 lg:my-10'
      open={detailsViewModal?.open}
      // prettier-ignore
      title={(
        <div>
          <h2 className='text-[20px] font-font-semi-bold lg:text-[24px]'>
            {`#${detailsViewModal?.responseId}. Survey Report Response Details:`}
          </h2>
          <Divider className='!mt-0 !pt-0' />
        </div>
      )}
      closable={false}
      width={1200}
      footer={[]}
      centered
    >
      <Button
        className='absolute right-5 top-5'
        // prettier-ignore
        onClick={() => setDetailsViewModal((prevState) => (
          { ...prevState, open: false, responseId: null }
        ))}
        icon={<CloseIcon />}
        size='large'
        type='link'
      />

      {loadingResponse ? (
        <SharedLoader />
      ) : errorResponse ? (
        <SharedError error={errorResponse} />
      ) : (
        <div>
          <Descriptions
            title='Participator Info'
            size='default'
            bordered
            items={[
              {
                key: '1',
                label: 'First Name',
                children: dataResponse?.data?.user_info?.first_name || 'N/A',
                span: 2,
              },
              {
                key: '2',
                label: 'Last Name',
                children: dataResponse?.data?.user_info?.last_name || 'N/A',
                span: 2,
              },
              {
                key: '3',
                label: 'Email',
                children: dataResponse?.data?.user_info?.email || 'N/A',
                span: 2,
              },
              {
                key: '4',
                label: 'Phone',
                children: dataResponse?.data?.user_info?.info?.phone || 'N/A',
                span: 2,
              },
              {
                key: '5',
                label: 'Date Of Birth',
                children: dataResponse?.data?.user_info?.info?.date_of_birth || 'N/A',
                span: 2,
              },
              {
                key: '6',
                label: 'Address',
                children: `${dataResponse?.data?.user_info?.info?.state || 'N/A'}, ${
                  dataResponse?.data?.user_info?.info?.city || 'N/A'
                }, ${dataResponse?.data?.user_info?.info?.postal_code || 'N/A'}, ${
                  dataResponse?.data?.user_info?.info?.country || 'N/A'
                }`,
                span: 2,
              },
            ]}
          />

          {dataResponse?.data?.response?.map((response, index) => (
            <Descriptions
              key={uuid()}
              className='mt-3'
              title={`Participated Response #${index + 1}`}
              size='small'
              bordered
              items={[
                {
                  key: '1',
                  label: <span className='whitespace-nowrap'>Question Title (English)</span>,
                  children: response?.title_en || 'N/A',
                  span: 4,
                },
                {
                  key: '2',
                  label: <span className='whitespace-nowrap'>Question Title (Filipino)</span>,
                  children: response?.title_ph || 'N/A',
                  span: 4,
                },
                {
                  key: '3',
                  label: <span className='whitespace-nowrap'>Answer</span>,
                  span: 4,
                  children: (
                    <div>
                      {/* if response `binary` && `mcq` when `multi_select` is false display radio group */}
                      {(response?.type === 'binary' ||
                        (response?.type === 'mcq' && !response?.multi_select)) && (
                        <Radio.Group value={response?.answer?.[0] || undefined}>
                          <Space direction='vertical'>
                            {response?.options?.map((data) => (
                              <Radio
                                key={uuid()}
                                value={data?.id}
                                disabled
                              >
                                {data?.[`option_title_${locale}`]}
                              </Radio>
                            ))}
                          </Space>
                        </Radio.Group>
                      )}

                      {/* if response `mcq` && `multi_select` is true display checkbox */}
                      {response?.type === 'mcq' && response?.multi_select && (
                        <Checkbox.Group value={response?.answer || undefined}>
                          <Row gutter={[10, 10]}>
                            {response?.options?.map((data) => (
                              <Col
                                key={uuid()}
                                span={24}
                                lg={12}
                              >
                                <Checkbox
                                  value={data?.id}
                                  disabled
                                >
                                  {data?.[`option_title_${locale}`]}
                                </Checkbox>
                              </Col>
                            ))}
                          </Row>
                        </Checkbox.Group>
                      )}

                      {/* if response `input` display input */}
                      {response?.type === 'input' && (
                        <Input
                          placeholder={response?.tag || 'Enter your answer'}
                          value={response?.answer}
                          size='large'
                          disabled
                        />
                      )}

                      {/* if response `scale` display radio group */}
                      {response?.type === 'scale' && (
                        <Radio.Group value={response?.answer || undefined}>
                          <Space direction='vertical'>
                            {response?.options?.map((data) => (
                              <Radio
                                key={uuid()}
                                value={data?.id}
                                disabled
                              >
                                {data?.[`option_title_${locale}`]}
                              </Radio>
                            ))}
                          </Space>
                        </Radio.Group>
                      )}

                      {/* if response `essay` display textarea */}
                      {response?.type === 'essay' && (
                        <Input.TextArea
                          placeholder={response?.tag || 'Enter your answer'}
                          value={response?.answer || undefined}
                          maxLength={1000}
                          size='large'
                          showCount
                          disabled
                          rows={4}
                        />
                      )}
                    </div>
                  ),
                },
              ]}
            />
          ))}
        </div>
      )}
    </Modal>
  );
}

ReportDetailsViewModal.propTypes = {
  detailsViewModal: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    responseId: PropTypes.number,
  }).isRequired,
  setDetailsViewModal: PropTypes.func.isRequired,
};
