import React from 'react';
import sinon from 'sinon';
import ConfirmDialog from './ConfirmDialog';
import { createShallow, createRender } from '@material-ui/core/test-utils';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

describe('<ConfirmDialog />', () => {
  let mockProps: any;
  let shallow: any;
  let render: any;

  beforeEach(() => {
    shallow = createShallow({ dive: true });
    render = createRender();

    mockProps = {
      onClose: sinon.spy(),
      open: true,
      title: 'Test Dialog',
      body: 'Test message body',
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call onClose with "cancel"', () => {
    const wrapper = shallow(<ConfirmDialog {...mockProps} />);

    wrapper.find('.btn-cancel').simulate('click');

    expect(mockProps.onClose.callCount).toEqual(1);
    expect(mockProps.onClose.calledWith('cancel')).toEqual(true);
  });

  it('should call onClose with "confirm"', () => {
    const wrapper = shallow(<ConfirmDialog {...mockProps} />);

    wrapper.find('.btn-ok').simulate('click');

    expect(mockProps.onClose.callCount).toEqual(1);
    expect(mockProps.onClose.calledWith('confirm')).toEqual(true);
  });

  it('should render the provided title text', () => {
    const wrapper = shallow(<ConfirmDialog {...mockProps} />);

    const title = wrapper
      .find(DialogTitle)
      .render()
      .text();

    expect(title).toEqual(mockProps.title);
  });

  it('should render the default title text if none provided', () => {
    mockProps.title = undefined;
    const wrapper = shallow(<ConfirmDialog {...mockProps} />);

    const title = wrapper
      .find(DialogTitle)
      .render()
      .text();

    expect(title).toEqual('Confirm');
  });

  it('should render the provided body text', () => {
    const wrapper = shallow(<ConfirmDialog {...mockProps} />);

    const body = wrapper
      .find(DialogContent)
      .render()
      .text();

    expect(body).toEqual(mockProps.body);
  });
});
