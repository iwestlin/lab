# https://www.zhihu.com/question/29316970/answer/151649630

require 'set'

def compose(p1, p2)
  (1..5).map { |i| p2[p1[i - 1] - 1] }
end

def invert(p)
  (1..5).map { |i| p.index(i) + 1 }
end

def commutate(p1, p2)
  compose(compose(compose(p1, p2), invert(p1)), invert(p2))
end

s5 = Set.new (1..5).to_a.permutation.to_a
puts "#{s5.length} permutations: #{s5.inspect}"

a5 = Set.new
for p1 in s5
  for p2 in s5
    a5 << commutate(p1, p2)
  end
end
puts "#{a5.length} commutators: #{a5.inspect}"

commutators_of_a5 = Set.new
for p1 in a5
  for p2 in a5
    commutators_of_a5 << commutate(p1, p2)
  end
end
puts "#{commutators_of_a5.length} commutators of commutators: #{commutators_of_a5.inspect}"