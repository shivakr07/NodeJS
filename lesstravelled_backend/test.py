
import math

def calculate_distance(point1, point2):
    return math.sqrt((point2[0] - point1[0])**2 + (point2[1] - point1[1])**2)

# Function to calculate the area of the circular land
def calculate_circle_area(radius):
    return math.pi * radius**2

# Function to find the nearest perfect square
def nearest_perfect_square(num):
    lower_sqrt = math.floor(math.sqrt(num))
    upper_sqrt = math.ceil(math.sqrt(num))
    
    lower_diff = num - lower_sqrt**2
    upper_diff = upper_sqrt**2 - num
    
    if lower_diff < upper_diff:
        return lower_sqrt**2
    else:
        return upper_sqrt**2

# Input
x1, y1 = map(float, input().split())
x2, y2 = map(float, input().split())
x3, y3 = map(float, input().split())

# Calculate the radius and area of the circular land
radius = calculate_distance((x1, y1), (x2, y2))
actual_area = calculate_circle_area(radius)

lent_amount = 5000  # Replace this with the actual lent amount
shiva_deserves_area = lent_amount / 20  # Assuming 20 bucks per square foot

# Calculate the fenced area based on the wrongly noted point
fenced_radius = calculate_distance((x1, y1), (x3, y3))
fenced_area = calculate_circle_area(fenced_radius)

# Compare the actual area with the fenced area
if fenced_area < actual_area:
    remaining_area = actual_area - fenced_area
    remaining_money = remaining_area * 20
    print("Krishna", remaining_money)
else:
    perfect_square_area = nearest_perfect_square(shiva_deserves_area)

    if perfect_square_area > shiva_deserves_area:
        # Shiva will pay for the remaining land
        remaining_area = perfect_square_area - shiva_deserves_area
        remaining_money = remaining_area * 20
        print("Shiva", remaining_money)
    else:
        # Krishna will pay for the remaining land
        remaining_area = shiva_deserves_area - perfect_square_area
        remaining_money = remaining_area * 20
        print("Krishna", remaining_money)
