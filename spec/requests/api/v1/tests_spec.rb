require 'rails_helper'

RSpec.describe Api::V1::TestsController do
  describe '#index' do
    it 'returns the expected json data' do
      get '/api/v1/tests'
      test_data = {users: ['John', 'Kate', 'Harry', 'Mary']}
      expect(response.body).to eq JSON.generate(test_data)
    end
  end
end
