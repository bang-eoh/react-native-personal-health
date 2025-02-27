import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import RowPersonalHealthDrawer from '../Row';
import Route from '../../../../../utils/Route';
import { PHContext } from '../../../../../context';
import { mockSPStore } from '../../../../../context/mockStore';

const mockedNavigate = jest.fn();
const mockSetAction = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const WrapComponent = ({ children }) => (
  <PHContext.Provider
    value={{ stateData: mockSPStore({}), setAction: mockSetAction }}
  >
    {children}
  </PHContext.Provider>
);

describe('Test RowPersonalHealthDrawer', () => {
  let wrapper;
  afterEach(() => {
    mockSetAction.mockClear();
    mockedNavigate.mockClear();
  });
  test('create RowPersonalHealthDrawer route={Route.Main}', () => {
    act(() => {
      wrapper = renderer.create(
        <WrapComponent>
          <RowPersonalHealthDrawer
            name={'name'}
            leftImage={true}
            borderBottom={true}
            vehicle={true}
            route={Route.Main}
          />
        </WrapComponent>
      );
    });
    const instance = wrapper.root;
    const button = instance.findAllByType(TouchableOpacity);
    expect(button.length).toEqual(1);
    act(() => {
      button[0].props.onPress();
    });
    expect(mockSetAction).toBeCalledTimes(1);
  });

  test('create RowPersonalHealthDrawer route={Route}', () => {
    act(() => {
      wrapper = renderer.create(
        <WrapComponent>
          <RowPersonalHealthDrawer
            name={'name'}
            leftImage={true}
            borderBottom={true}
            vehicle={true}
            route={Route}
          />
        </WrapComponent>
      );
    });
    const instance = wrapper.root;
    const button = instance.findAllByType(TouchableOpacity);
    expect(button.length).toEqual(1);
    act(() => {
      button[0].props.onPress();
    });
    expect(mockedNavigate).toBeCalledTimes(1);
  });

  test('create RowPersonalHealthDrawer route null', () => {
    act(() => {
      wrapper = renderer.create(
        <WrapComponent>
          <RowPersonalHealthDrawer
            name={'name'}
            leftImage={true}
            borderBottom={true}
            vehicle={true}
            saved={true}
          />
        </WrapComponent>
      );
    });
    const instance = wrapper.root;
    const button = instance.findAllByType(TouchableOpacity);
    expect(button.length).toEqual(1);
    act(() => {
      button[0].props.onPress();
    });
    expect(mockedNavigate).not.toBeCalled();
  });
});
