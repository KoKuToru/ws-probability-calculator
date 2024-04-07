a = list(reversed([ 123, 456, 789, 123 ]))
b = list(reversed([   1, 123, 123,   2 ]))
r = 0

for i in range(4):
    for j in range(4):
        r += (a[i] * 1000**i) // (b[j] * 1000**j)
print(r)

