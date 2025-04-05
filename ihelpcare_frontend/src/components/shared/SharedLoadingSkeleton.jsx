import { Skeleton } from 'antd';

function SharedLoadingSkeleton() {
  return (
    <div className='container mx-auto w-full space-y-4'>
      <div className='space-y-8 rounded-md border-[1px] border-solid border-[#e1e1e1] p-4'>
        <Skeleton.Button
          shape='default'
          size='large'
          active
          block
        />
        <Skeleton
          paragraph={{ rows: 2 }}
          active
        />
      </div>
      <Skeleton.Button
        className='rounded-md border-[1px] border-solid border-[#e1e1e1] p-4'
        shape='default'
        size='large'
        active
        block
      />
      <Skeleton.Button
        className='rounded-md border-[1px] border-solid border-[#e1e1e1] p-4'
        shape='default'
        size='large'
        active
        block
      />
      <Skeleton.Button
        className='rounded-md border-[1px] border-solid border-[#e1e1e1] p-4'
        shape='default'
        size='large'
        active
        block
      />
      <Skeleton.Button
        className='rounded-md border-[1px] border-solid border-[#e1e1e1] p-4'
        shape='default'
        size='large'
        active
        block
      />
    </div>
  );
}

export default SharedLoadingSkeleton;
