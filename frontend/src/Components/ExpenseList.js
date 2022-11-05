import { Card, Button } from 'semantic-ui-react';


const ExpenseList = ({ expenses, updateFn, deleteFn }) => {
    const updateExpense = (index, item, cost) => {
        updateFn(index, item, cost);
    };

    const deleteExpense = (index) => {
        console.log('in')
        deleteFn(index);
    };

    return (
        <Card.Group>
            {
                expenses?.map(element => {
                    return (
                        <Card fluid id={element.index}>
                            <Card.Content>
                                <Card.Header>{element.name}</Card.Header>
                                <Card.Description>
                                    ${element.value}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green' onClick={() => updateExpense(element.id, element.name, element.value)}>
                                        Edit
                                    </Button>
                                    <Button basic color='red' onClick={() => deleteExpense(element.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    )
                })
            }
        </Card.Group>
    )
};

export default ExpenseList;