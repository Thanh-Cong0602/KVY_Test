import { setMaxPrice, setMinPrice } from '@/redux/feature/product.slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Button, Flex, Input, Popover, Slider, Space } from 'antd'
import React, { useEffect, useState } from 'react'

const SliderPrice: React.FC = () => {
  const dispatch = useAppDispatch()
  const minPrice = useAppSelector(state => state.product.minPrice)
  const maxPrice = useAppSelector(state => state.product.maxPrice)
  const clearFilter = useAppSelector(state => state.product.clearFilter)
  const [buttonText, setButtonText] = useState<string>('Price Range')
  const [isPopoverVisible, setIsPopoverVisible] = useState<boolean>(false)

  const handleSliderChange = (values: number[]) => {
    dispatch(setMinPrice(values[0]))
    dispatch(setMaxPrice(values[1]))
  }

  const handleConfirm = () => {
    setButtonText(`Min: ${minPrice} - Max: ${maxPrice}`)
    dispatch(setMinPrice(minPrice))
    dispatch(setMaxPrice(maxPrice))
  }

  useEffect(() => {
    if (clearFilter) setButtonText('Price Range')
  }, [clearFilter])

  const sliderContent = (
    <div className='slider__wrapper' style={{ padding: '10px' }}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Slider
          range
          defaultValue={[20, 200]}
          min={0}
          max={1000}
          onChange={handleSliderChange}
          onChangeComplete={handleConfirm}
          value={[minPrice, maxPrice]}
        />
        <div>
          <p>Minimum Price</p>
          <Input value={minPrice} readOnly style={{ marginBottom: '10px' }} />
        </div>
        <div>
          <p>Maximum Price</p>
          <Input value={maxPrice} readOnly style={{ marginBottom: '20px' }} />
        </div>
        <Button
          type='primary'
          onClick={() => setIsPopoverVisible(false)}
          style={{ width: '100%' }}
        >
          Apply
        </Button>
      </Space>
    </div>
  )

  return (
    <Flex gap='10px' align='center'>
      <label className='filter_label'>Price:</label>
      <Space direction='vertical'>
        <Popover
          content={sliderContent}
          title='Select Price Range'
          trigger='click'
          visible={isPopoverVisible}
          onVisibleChange={visible => setIsPopoverVisible(visible)}
          placement='bottomLeft'
          overlayStyle={{ width: '300px' }}
        >
          <Button style={{ width: '200px' }} onClick={() => setIsPopoverVisible(true)}>
            {buttonText}
          </Button>
        </Popover>
      </Space>
    </Flex>
  )
}

export default SliderPrice
