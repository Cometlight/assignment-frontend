import should from 'should'
import {
  valid,
  degreeProgram,
  level,
  graduationYear
} from '../src/module'

describe('01-modules', () => {
  describe('#valid()', () => {
    it('should be a valid FH email', () => {
      valid('hmoser.mmt-b2015@fh-salzburg.ac.at').should.be.true();
      valid('hmoser.mmt-m2016@fh-salzburg.ac.at').should.be.true();
      valid('HMOSER.mmt-m2016@fh-salzburg.ac.at').should.be.true();
      valid('ds.mmt-b2014@fh-salzburg.ac.at').should.be.true();
      valid('hmoser.mma-b2015@fh-salzburg.ac.at').should.be.true();
    })
    it('should be an invalid FH email', () => {
      valid('hannes.moser@fh-salzburg.ac.at').should.be.false()
      valid('h.mmt-b2015@fh-salzburg.ac.at').should.be.false()
      valid('hmoser.mmt-a2015@fh-salzburg.ac.at').should.be.false()
      valid('hmoser.mmt-b201@fh-salzburg.ac.at').should.be.false()
      valid('hmoserxmmt-b2015@fh-salzburg.ac.at').should.be.false()
      valid('hmoser.mmt-b2015@fh-salzburgxac.at').should.be.false()
      valid('hmoser.mmt-b2015@fh-salzburg.acxat').should.be.false()
      valid('hmoser.mmt-b2015fh-salzburg.ac.at').should.be.false()
      valid('hmoser.mmtb2015@fh-salzburg.ac.at').should.be.false()
      valid('hmoser.a4b-b2015@fh-salzburg.ac.at').should.be.false()
      valid('email: hmoser.mmt-b2015@fh-salzburg.ac.at').should.be.false()
      valid('hmoser.mmt-b2015@fh-salzburg.ac.at is an email').should.be.false()
    })
  })

  describe('#degreeProgram()', () => {
    it('should match MMT', () => {
      degreeProgram('hmoser.mmt-b2015@fh-salzburg.ac.at').should.eql('MMT')
    })
    it('should match MMA', () => {
      degreeProgram('hmoser.mma-b2015@fh-salzburg.ac.at').should.eql('MMA')
    })
  })

  describe('#level()', () => {
    it('should match BA or MA', () => {
      level('hmoser.mmt-b2015@fh-salzburg.ac.at').should.eql('BA')
      level('hmoser.mmt-m2015@fh-salzburg.ac.at').should.eql('MA')
    })
  })

  describe('#graduationYear()', () => {
    it('should be your graduation year', () => {
      graduationYear('hmoser.mmt-b2015@fh-salzburg.ac.at').should.eql(2018)
      graduationYear('hmoser.mmt-m2015@fh-salzburg.ac.at').should.eql(2017)
    })
  })
})
