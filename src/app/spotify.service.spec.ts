import { TestBed } from '@angular/core/testing'

import { SpotifyService } from './spotify.service'

describe('SpotifyService', () => {
  let service: SpotifyService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(SpotifyService)
  })

  xit('should be created', () => {
    expect(service).toBeTruthy()
  })
})
