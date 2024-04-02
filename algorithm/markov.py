from decimal import Decimal, getcontext

getcontext().prec = 50  # 设置精度为50位

results = {}

def get_p(n):
    n = int(n) if n else 0
    if n < 10:
        return Decimal(0)
    elif n == 10:
        return Decimal(0.5) ** 10
    else:
        if n in results:
            return results[n]
        else:
            temp = get_p(n - 1) + (Decimal(1) - get_p(n - 11)) / (2 ** 11)
            results[n] = temp
            return temp

print(get_p(1000))
# 0.38544975241248163591033244318931399962316713799368

matrix = [
  [Decimal('0.5'), Decimal('0.5'), Decimal('0.5'), Decimal('0.5'), Decimal('0.5'), Decimal('0.5'), Decimal('0.5'), Decimal('0.5'), Decimal('0.5'), Decimal('0.5'), Decimal('0')],
  [Decimal('0.5'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0')],
  [Decimal('0'), Decimal('0.5'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0')],
  [Decimal('0'), Decimal('0'), Decimal('0.5'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0')],
  [Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0.5'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0')],
  [Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0.5'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0')],
  [Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0.5'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0')],
  [Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0.5'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0')],
  [Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0.5'), Decimal('0'), Decimal('0'), Decimal('0')],
  [Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0.5'), Decimal('0'), Decimal('0')],
  [Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0.5'), Decimal('1')]
]

def mySum(a, b):
  return sum(x * y for x, y in zip(a, b))

def repeat(n):
  state = [Decimal('1'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0'), Decimal('0')]
  for _ in range(int(n)):
    copy = state[:]
    state = [mySum(copy, matrix[i]) for i in range(len(matrix))]
  return state

print(repeat(1000)[10])
# 0.38544975241248163591033244318931399962316713799370
