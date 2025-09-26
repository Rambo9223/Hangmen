import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ToggleRestart from './ToggleRestart';
import "@testing-library/jest-dom";


describe('Toggle Restart Tests',() => {
  
  const setPlaying = jest.fn();
  const setGameOver = jest.fn();
    // page matches snapshot
  test('Page matches snapshot', () => {
    render(<ToggleRestart/>);
    expect(screen).toMatchSnapshot();
  });

  test('Button calls setPlaying & setGameOver on Click', async () => {
    render(<ToggleRestart setPlaying={setPlaying} setGameOver={setGameOver}/>);
    let button = await screen.findByRole("button");
    expect(button).toBeInTheDocument();

    await waitFor(()=>{
        fireEvent.click(button);
    });

    expect(setPlaying).toHaveBeenCalledTimes(1);
    expect(setGameOver).toHaveBeenCalledTimes(1);

  })
});
