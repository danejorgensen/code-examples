# Ruby 2.1/RSpec 3.X

# PROBLEM: Find the 333rd prime that starts and ends with 3

#!/usr/bin/ruby
require 'prime'

class FindPrime
  attr_reader :beginning_with, :ending_with, :iteration

  def initialize(attributes = {})
    @beginning_with = attributes.fetch(:beginning_with) { 3 } #default to 3
    @ending_with = attributes.fetch(:ending_with) { 3 } #default to 3
    @iteration = attributes.fetch(:iteration) { 333 } #default to 333
    @prime = attributes.fetch(:prime) #Raise Key Not Found

    @count = 0
    @count_iterations = 0
  end

  def find
    reset_counters

    while 1 do
      @count += 1
      next unless prime?(@count)
      @count_iterations += 1 if it_begins_and_ends_with?(@count)
      return @count if @count_iterations == @iteration
    end

    raise StandardError #Couldn't find it
  end

private
  def reset_counters
    @count = 0
    @count_iterations = 0
  end

  def prime?(x)
    @prime.prime?(x)
  end

  def it_begins_and_ends_with?(x)
    array = x.to_s.split('')
    array.first == @beginning_with.to_s && array.last == @ending_with.to_s
  end
end

### Usage ###
prime = FindPrime.new({
          beginning_with: 3,
          ending_with: 3,
          iteration: 333,
          prime: Prime #dependency injection
        })

p "Iterations: #{prime.iteration}"
p "Beginning With: #{prime.beginning_with}"
p "Ending With: #{prime.ending_with}"
p "Result: #{prime.find}"


# RSpec Tests
# Arrange, Act, Assert
describe FindPrime do
  it 'should set correct default values' do
    prime = FindPrime.new({ prime: Prime })

    expect(prime.beginning_with).to eq(3)
    expect(prime.ending_with).to eq(3)
    expect(prime.iteration).to eq(333)
  end

  it 'should raise key error when prime dependency injection is nil' do
    expect(FindPrime.new).to raise_error(KeyError)
  end

  it 'should return the correct result' do
    prime = FindPrime.new({ prime: Prime }).find

    expect(prime).to eq(302443)
  end
end
