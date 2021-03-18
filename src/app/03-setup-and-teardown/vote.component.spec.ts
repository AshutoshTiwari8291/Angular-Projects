import { VoteComponent } from './vote.component'; 

describe('VoteComponent', () => {
  let component: VoteComponent;

  beforeEach(() => {
    component = new VoteComponent(); // Set up things done here
  });

  afterEach(() => {
    // If anything need to be done after each test. Like cleanup
  });

  beforeAll(() => {
    // Run before all tests
  });

  afterAll(() => {
    // Run after executing all tests
  });

  it('should increment total votes when upvoted', () => {
    // Arrange - Initialize the component instance and other initializations
    let component = new VoteComponent();

    // Act - Calling function or invocation
    component.upVote();

    // Assertion - What to expect.     // So use 3 AAA's as Arrange, Act, Assert to test any file 
    expect(component.totalVotes).toBe(1);
  });

  it('should decrement total votes when downvotes', () => {
    let component = new VoteComponent();
    component.downVote();
    expect(component.totalVotes).toBe(-1);
  });
});