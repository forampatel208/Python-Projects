# Get User Input
while True:
    try:
        firstNumber = float(input("Enter the first number: "))
        break
    except ValueError:
        print("Oops! That’s not a valid number. Please try again:")


valid_operations = ['+', '-', '*', '/']
operation = input("Enter the operation (+, -, *, /): ")
while operation not in valid_operations:
    operation = input("Invalid operation. Enter the operation (+, -, *, /): ")


while True:
    try:
        secondNumber = float(input("Enter the second number: "))
        break
    except ValueError:
        print("Oops! That’s not a valid number. Please try again:")

# Perform Operation
if operation == '+':
    result = firstNumber + secondNumber
elif operation == '-':
    result = firstNumber - secondNumber
elif operation == '*':
    result = firstNumber * secondNumber
elif operation == '/':
    if secondNumber != 0:
        result = firstNumber / secondNumber
    else:
        result = "Error! Cannot divide by zero."

# Display the Result
print("The answer is:", result)
