require 'rails_helper'

RSpec.describe Region, :type => :model do

  describe '.find_by_location' do

    it 'should return a Region' do
      expect(Region.find_by_location(41.890633, -87.629238)).to be_a Region
    end

    it 'should return the correct ward_secti' do  
      expect(Region.find_by_location(41.890633, -87.629238).ward_secti).to eq("4202")
    end

    it 'should return nil for locations outside Chicago' do
      expect(Region.find_by_location(50,50)).to eq(nil)
    end

    it 'should handle discontinuous polygons' do
      region1 = Region.find_by_location(41.803713, -87.613624)
      region2 = Region.find_by_location(41.804873, -87.613774)
      region3 = Region.find_by_location(41.806256, -87.613613)
      expect(region1).to eq(region3)
      expect(region1).not_to eq(region2)
    end
  end

  describe '#cleaning_days' do
    
    let(:region) { Region.find(2) }

    it 'should return an array of dates' do
      expect(region.cleaning_days).to be_a Array
      expect(region.cleaning_days.first).to be_a Date
    end

    it 'should contain the correct number of dates' do
      expect(region.cleaning_days.count).to eq(12)
    end

    it 'should return the correct dates' do
      expect(region.cleaning_days.first).to eq(Date.new(2014,05,05))
      expect(region.cleaning_days.last).to eq(Date.new(2014,11,10))
    end
  end

  describe '#next_cleaning_day' do
    
    let(:region) { Region.find(4) }

    it 'should return a date' do
      expect(region.next_cleaning_day).to be_a Date
    end

    it 'should return a date after today' do
      expect(region.next_cleaning_day).to be >= Date.today
    end

    it 'should return nil if there are no future cleaning dates' do
      expect(Region.find(600).next_cleaning_day).to be nil
    end
  end

  describe '.areas_by_date_range' do
    
    let(:area) { Region.areas_by_date_range([41.890633, -87.629238]) }

    it 'should return an array of two arrays' do
      expect(area[0]).to be_a Array
      expect(area[1]).to be_a Array
    end

    it 'should return two empty arrays if the location is not in Chicago' do
      area = Region.areas_by_date_range([50,50])
      expect(area[0]).to be_empty
      expect(area[1]).to be_empty
    end

  end

  describe '#future_cleaning_days' do
    
    it 'should return an array of Dates' do
      region = Region.find(1)
      expect(region.future_cleaning_days).to be_a Array
      expect(region.future_cleaning_days[0]).to be_a Date
    end

    it 'should only have dates in the future' do
      expect(Region.find(1).future_cleaning_days.select { |day| day <= Date.today }).to be_empty
    end

    it 'should return an empty array for a region with no street sweeping' do
      expect(Region.find(600).future_cleaning_days).to be_empty
    end
  end

  describe '#future_cleaning_days_formatted' do
    it 'returns an array' do
      expect(Region.first.future_cleaning_days_formatted).to be_a Array
    end
  end

  describe '#swept_soon?' do
    it 'returns true if swept soon' do
      region = Region.all.find { |region| region.swept_soon? }
      expect(region.swept_soon?).to be true
    end

    it 'returns false if not' do
      expect(Region.find(600).swept_soon?).to be false
    end
  end

  describe '#swept_in_date_range?' do
    it 'can return true' do
      region = Region.all.find { |region| region.swept_soon? }
      expect(region.swept_in_date_range?).to be true
    end

    it 'returns false with no sweeping' do
      expect(Region.find(600).swept_in_date_range?).to be false
    end
  end

  describe '#to_geojson' do
    it 'returns an active record collection' do
      expect(Region.first.to_geojson[0]).to be_a Region
    end
  end
end
