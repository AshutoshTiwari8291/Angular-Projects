import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the itmes returned from the server', () => {
    let todos = [1,2,3];

    spyOn(service, 'getTodos').and.callFake(() => {
      return Observable.from(todos);
    }); // To check function is called, change the implementation of the method, return different value or throw an error.(Overall we get control over a method in a class) 
  
    component.ngOnInit();
    expect(component.todos.length).toBe(todos);
  });

  it('should call the server to save the changes when a new todo item is added', () => {
    let spy = spyOn(service, 'add').and.callFake(t => {
      return Observable.empty();
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  // If function retun value
  it('should add the new todo returned from the server', () => {
    let todo = { id: 1 }
    // let spy = spyOn(service, 'add').and.callFake(t => {
    //   return Observable.from([todo]);
    // });

    // We can return like this also
    let spy = spyOn(service, 'add').and.returnValue(Observable.from([todo]));

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  // If function will not retun value
  it('should set message property if server return error when adding a new todo', () => {
    let error = 'error from the server'
    let spy = spyOn(service, 'add').and.returnValue(Observable.throw([error]));

    component.add();

    expect(component.message).toBe(error);
  });


  it('should call ther server to delete a todo item if user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should NOT call ther server to delete a todo item if user cancel', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).not.toHaveBeenCalledWith(1);
  });
});