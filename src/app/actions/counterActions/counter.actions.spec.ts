import { NgRedux } from '@angular-redux/store';
import { CounterActions } from './counter.actions';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';


describe('counter action creators', () => {
  let actions: CounterActions;
  let mockRedux: NgRedux<any>;
  let dispatchSpy;
  beforeEach(() => {
    mockRedux = MockNgRedux.getInstance();
    actions = new CounterActions(mockRedux);

    MockNgRedux.reset();

    mockRedux = MockNgRedux.getInstance();

  });

  it('increment should dispatch INCREMENT_COUNTER action', () => {
    const expectedAction = {
      type: CounterActions.INCREMENT_COUNTER
    };

    spyOn(mockRedux, 'dispatch');
    actions.increment();

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('decrement should dispatch DECREMENT_COUNTER action', () => {
    const expectedAction = {
      type: CounterActions.DECREMENT_COUNTER
    };

    spyOn(mockRedux, 'dispatch');
    actions.decrement();

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
