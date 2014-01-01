%w(Set).each do |lib| require lib end

# Works as a collection of GraphNodes
# Implements graph algorithms
class Graph

end

# Provides basic behavior rules for a graph node
# A graph node is a set of graph nodes (related nodes) labeled with an object
class GraphNode
  @relations    = Set.new
  @label        = Object.new
  
  # Returns a collection of GraphNodes
  # If a block is given, each of the relations gets passed to it
  def self.relations(&block)
    if block?
      @relations.each {|o| yield(o)}
    else
      @relations
    end
  end
  
  # Returns an iterator for depth-first graph traversal
  def self.traverse_in_depth(&block)
  end
end